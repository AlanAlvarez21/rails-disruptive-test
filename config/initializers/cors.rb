# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://127.0.0.1:5173'
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
