# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :currencies
    end
  end

  post '/calculate_investment', to: 'investments#calculate'
  post '/recaulculate_roi', to: 'investments#recaulculate_roi'
end
