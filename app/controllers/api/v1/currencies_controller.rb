# frozen_string_literal: true

# controllers/api/v1/currencies_controller.rb
module Api
  module V1
    class CurrenciesController < ApplicationController
      before_action :set_currency, only: %i[show update destroy]

      def index
        @currencies = CurrencyService.fetch_currencies
        render json: @currencies
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      def set_currency
        @currency = Currency.find(params[:id])
      end
    end
  end
end
