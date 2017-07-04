class TimelineChannel < ApplicationCable::Channel
    def subscribed
        #@testparam = params[:testparam]
        #puts @testparam

        stream_from "timeline_stream"
    end

    def unsubscribed
        @testparam = nil
    end
end
