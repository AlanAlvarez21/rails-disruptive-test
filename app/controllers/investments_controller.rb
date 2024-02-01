# frozen_string_literal: true
require 'csv'
require 'httparty'

class InvestmentsController < ApplicationController
  before_action :fetch_currencies_data, only: [:calculate, :recaulculate_roi]

  def calculate
    investments = []

    if File.exist?('origen.csv')
      CSV.foreach('origen.csv', headers: true) do |row|
        asset_id = row['Moneda']
        initial_balance = row['balance_ini'].to_f
        monthly_interest = row['Interes_mensual'].to_f
        currency_data = @currencies_data.find { |currency| currency['name'] == row['Moneda'] }

        if currency_data
          price_usd = currency_data['price_usd']
          investment = Investment.new(asset_id, monthly_interest, initial_balance, price_usd)
          investments << investment.calculate_profit
        else
          investments << { currency: asset_id, error: 'Currency data not found' }
        end
      end

      render json: investments
    else
      render json: { error: 'No file provided' }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def recaulculate_roi
    input_data = JSON.parse(request.body.read)
    investments = []

    if File.exist?('origen.csv')
      CSV.foreach('origen.csv', headers: true) do |row|
        asset_id = row['Moneda']
        initial_balance = input_data[asset_id].to_f
        monthly_interest = row['Interes_mensual'].to_f
        crypto_amount = @currencies_data.find { |currency| currency['name'] == row['Moneda'] }['price_usd']
        investment = Investment.new(asset_id, monthly_interest, initial_balance, crypto_amount)
        investments << investment.calculate_profit
      end

      render json: investments
    else
      render json: { error: 'No file provided' }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def fetch_currencies_data
    currencies_response = HTTParty.get('http://localhost:3000/api/v1/currencies')
    @currencies_data = JSON.parse(currencies_response.body)
  end
end
