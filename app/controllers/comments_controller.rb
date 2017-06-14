class CommentsController < ApplicationController
    def index
        if request.xhr?
            respond_with Comment.all
        else
            # for now, only ajax requests served
        end
    end

    def create
        respond_with Comment.create(comment_params)
    end

    private
        def comment_params
            params.require(:comment).permit(:id, :content, :user_id, :status_id)
        end
end
