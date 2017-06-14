class SessionsController < ApplicationController
    # don't require redirect to login because you're already at the login controller
    skip_before_action :require_login

    def new
    end

    def create
        user = User.find_by(username: params[:session][:username])

        if user && user.authenticate(params[:session][:password])
            log_in user
            # FOR NOW
            redirect_to root_path
        else
            flash[:failure] = 'Invalid username/password combination. Try again.'
            redirect_to login_path
        end
    end

    def destroy
        log_out
        redirect_to root_path
    end
end
