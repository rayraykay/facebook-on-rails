class RepliesController < ApplicationController
    def create
        Reply.create(reply_params) if request.xhr?
        return render json: {status: :ok}
    end

    private
        def reply_params
            params.require(:reply).permit(:id, :content, :user_id, :status_id, :comment_id)
        end
end
