class UserhomeController < ApplicationController
    def index
        if request.xhr?
            return render json: { status:   :ok,
                                  users:    User.all,
                                  statuses: Status.all,
                                  comments: Comment.all,
                                  replies:  Reply.all,
                                  likes:    Like.all }
        else
            # just render index
        end
    end

    def search
        @query = params[:query]

        # queue up an array with the entire database
        @database = [];
        Status.all.each do |status|
            @database << status.content
        end

        # find the shortest levenstein distance from the query
        # to the database items. First assume that the largest
        # distance is the unsigned maximum
        @result = nil;
        @minimum_distance = 2**32 - 1 # consider max
        @database.each do |item|
            @current_distance = levenshtein(@query, item)

            if @current_distance < @minimum_distance
                @minimum_distance = @current_distance
                @result = item
            end
        end

        return render json: { status: :ok,
                              result: @result }
    end

    private
        def levenshtein(first, second)
            matrix = [(0..first.length).to_a]
            (1..second.length).each do |j|
                matrix << [j] + [0] * (first.length)
            end

            (1..second.length).each do |i|
                (1..first.length).each do |j|
                    if first[j-1] == second[i-1]
                        matrix[i][j] = matrix[i-1][j-1]
                    else
                        matrix[i][j] = [
                          matrix[i-1][j],
                          matrix[i][j-1],
                          matrix[i-1][j-1],
                        ].min + 1
                    end
                end
            end

            return matrix.last.last
        end
end
