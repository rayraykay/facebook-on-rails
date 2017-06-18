class UserhomeController < ApplicationController
    def index
        if request.xhr?
            return render json: { status:   :ok,
                                  users:    User.all,
                                  statuses: Status.all,
                                  comments: Comment.all,
                                  replies:  Reply.all }
        else
            # just render index
        end
    end
end
