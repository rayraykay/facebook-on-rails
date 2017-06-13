class UsersController < ApplicationController
    def new
    end

    def create
        @new_user = User.new(user_params)

        if @new_user.save
            flash[:welcome] = 'Welcome to (Fake) Facebook on Rails!'
            log_in @new_user
            redirect_to root_path
        else
            flash[:failure] = 'There was a problem signing up. Please try again.'
            render 'new'
        end
    end

    def destroy
    end

    private
        def user_params
            params.require(:user).permit(:username, :password, :password_confirmation)
        end
end
