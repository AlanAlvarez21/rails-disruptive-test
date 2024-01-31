# frozen_string_literal: true

require 'csv'

class Investment
  attr_reader :currency, :monthly_interest, :initial_balance

  def initialize(currency, monthly_interest, initial_balance)
    @currency = currency
    @monthly_interest = monthly_interest.to_f / 100
    @initial_balance = initial_balance.to_f
  end

  def calculate_profit
    yearly_interest = (1 + @monthly_interest)**12 - 1
    final_balance = @initial_balance * (1 + yearly_interest)
    profit = final_balance - @initial_balance
    { currency: @currency, final_balance: final_balance, profit: profit, initial_balance: @initial_balance }
  end
end
