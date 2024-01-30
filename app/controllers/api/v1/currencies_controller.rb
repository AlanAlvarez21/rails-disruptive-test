# frozen_string_literal: true

require 'uri'
require 'net/http'

# Currencies Controller
module Api
  module V1
    class CurrenciesController < ApplicationController
      before_action :set_currency, only: %i[show update destroy]

      # GET /currencies
      def index
        # assets = %w[BTC ADA ETH]

        assets = Currency.all.map(&:title).join(',') 
        url = URI("https://rest.coinapi.io/v1/assets/#{assets}")
        https = Net::HTTP.new(url.host, url.port)
        https.use_ssl = true
        request = Net::HTTP::Get.new(url)
        request['Accept'] = 'text/plain'
        request['X-CoinAPI-Key'] = 'F3699613-BEF1-4ADD-83D2-B90D9CBDABDD'

        response = https.request(request)

        @currencies = response.read_body
        # @currencies = Currency.all

        # render json: @currencies
        render json: @currencies
      end

      # GET /currencies/1
      def show
        render json: @currency
      end

      # POST /currencies
      def create
        @currency = Currency.new(currency_params)

        if @currency.save
          render json: @currency, status: :created, location: @currency
        else
          render json: @currency.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /currencies/1
      def update
        if @currency.update(currency_params)
          render json: @currency
        else
          render json: @currency.errors, status: :unprocessable_entity
        end
      end

      # DELETE /currencies/1
      def destroy
        @currency.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_currency
        @currency = Currency.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def currency_params
        params.require(:currency).permit(:title, :body)
      end
    end
  end
end
