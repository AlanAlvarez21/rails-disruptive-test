# frozen_string_literal: true

require 'test_helper'

class CurrenciesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @currency = currencies(:one)
  end

  test 'should get index' do
    get currencies_url, as: :json
    assert_response :success
  end

  test 'should create currency' do
    assert_difference('Currency.count') do
      post currencies_url, params: { currency: { body: @currency.body, title: @currency.title } }, as: :json
    end

    assert_response :created
  end

  test 'should show currency' do
    get currency_url(@currency), as: :json
    assert_response :success
  end

  test 'should update currency' do
    patch currency_url(@currency), params: { currency: { body: @currency.body, title: @currency.title } }, as: :json
    assert_response :success
  end

  test 'should destroy currency' do
    assert_difference('Currency.count', -1) do
      delete currency_url(@currency), as: :json
    end

    assert_response :no_content
  end
end
