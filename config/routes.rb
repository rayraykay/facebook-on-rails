Rails.application.routes.draw do
  get 'likes/create'

    # website routes
    root    'static_pages#index'
    get     '/signup'       => 'users#new'
    post    '/signup'       => 'users#create'
    get     '/login'        => 'sessions#new'
    post    '/login'        => 'sessions#create'
    get     '/logout'       => 'sessions#destroy'
    get     '/timeline'     => 'userhome#index'

    # posting routes for the front end
    get     '/userhome/search'
    post    '/statuses/create'
    post    '/comments/create'
    post    '/replies/create'
    post    '/likes/create'
    delete  '/likes/delete'

    resources :user
    resources :status
    resources :comments
    resources :replies
    resources :likes
end
