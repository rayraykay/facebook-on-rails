class StatusesController < ApplicationController
    def index
        if request.xhr?
            respond_with Status.all
        else
            #
        end
    end

    def create
        respond_with Status.create(status_params)
    end

    private
        def status_params
            params.require(:status).permit(:id, :content, :user_id)
        end
end
