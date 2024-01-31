class InvestmentsController < ApplicationController
    def calculate
      investments = []
      CSV.foreach('origen.csv', headers: true) do |row|
        investment = Investment.new(row['Moneda'], row['Interes_mensual'], row['balance_ini'])
        investments << investment.calculate_profit
      end
      render json: investments
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
end
  