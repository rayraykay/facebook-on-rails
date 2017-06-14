Rails.application.routes.draw do
    root    'static_pages#index'
    get     '/signup'       => 'users#new'
    post    '/signup'       => 'users#create'
    get     '/login'        => 'sessions#new'
    post    '/login'        => 'sessions#create'
    get     '/logout'       => 'sessions#destroy'
    get     '/timeline'     => 'userhome#index'

    resources :users
end
