module ApplicationCable
    class Connection < ActionCable::Connection::Base
        identified_by :current_user

        def connect
            reject_unauthorized_connection if !(self.current_user = User.find_by(id: cookies.signed[:user_id]))
        end

        def disconnect
        end
    end
end
