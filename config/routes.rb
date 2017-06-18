Rails.application.routes.draw do
    # website routes
    root    'static_pages#index'
    get     '/signup'       => 'users#new'
    post    '/signup'       => 'users#create'
    get     '/login'        => 'sessions#new'
    post    '/login'        => 'sessions#create'
    get     '/logout'       => 'sessions#destroy'
    get     '/timeline'     => 'userhome#index'

    # posting routes for the front end
    post    '/statuses/create'
    post    '/comments/create'

    resources :user
    resources :status
    resources :comments
    resources :replies
end
