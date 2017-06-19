class LikesController < ApplicationController
    def create
        Like.create(like_params) if request.xhr?
        return render json: {status: :ok}
    end

    def delete
        # have to filter by .first because a collection is returned, but there should only be one
        Like.where(user_id: params[:like][:user_id], status_id: params[:like][:status_id]).first.destroy
        return render json: {status: :ok}
    end

    private
        def like_params
            params.require(:like).permit(:id, :status_id, :user_id)
        end
end
