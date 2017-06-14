class UsersController < ApplicationController
    skip_before_action :require_login, :only => [:new, :create]

    def index
        if request.xhr?
            respond_with User.all
        else
            # for now, only ajax requests served
        end
    end

    def new
    end

    def create
        @new_user = User.new(user_params)

        # if not ajax request
        if !request.xhr?
            if @new_user.save
                flash[:welcome] = 'Welcome to (Fake) Facebook on Rails!'
                log_in @new_user
                redirect_to root_path
            else
                flash[:failure] = 'There was a problem signing up. Please try again.'
                render 'new'
            end
        else
            respond_with @new_user, json: @new_user
        end
    end

    def destroy
    end

    private
        def user_params
            params.require(:user).permit(:username, :password, :password_confirmation)
        end
end
