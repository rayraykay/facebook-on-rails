class RepliesController < ApplicationController
    def index
    end

    def create
    end

    private
        def reply_params
            params.require(:reply).permit(:content, :user_id, :status_id, :comment_id)
        end
end
