module SessionsHelper
    def log_in (user)
        # example of the session object
        # session[:user_id] = user.id
        cookies.signed[:user_id] = user.id
    end

    def current_user? (user)
        user == current_user
    end

    def current_user
        @current_user ||= User.find_by(id: cookies.signed[:user_id])
    end

    def logged_in?
        !current_user.nil?
    end

    def log_out
        cookies.signed[:user_id] = nil
        @current_user = nil
    end

    # broadcast all data to the client
    def broadcast_data_to_timeline
        ActionCable.server.broadcast 'timeline_stream', { status: :ok }
        puts 'streaming...'
    end
end
