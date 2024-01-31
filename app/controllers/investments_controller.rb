# frozen_string_literal: true

require 'csv'

class InvestmentsController < ApplicationController
  def calculate
    investments = []
    if File.exist?('origen.csv') # Check if file exists
      CSV.foreach('origen.csv', headers: true) do |row|
        investment = Investment.new(row['Moneda'], row['Interes_mensual'], row['balance_ini'])
        investments << investment.calculate_profit
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

    if File.exist?('origen.csv') # Check if file exists
      CSV.foreach('origen.csv', headers: true) do |row|
        asset_id = row['Moneda']
        initial_balance = input_data[asset_id].to_f # Convertir a float
        monthly_interest = row['Interes_mensual'].to_f # Obtener el interés mensual del CSV
        investment = Investment.new(asset_id, monthly_interest, initial_balance)
        investments << investment.calculate_profit
      end
      render json: investments
    else
      render json: { error: 'No file provided' }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
