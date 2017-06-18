class Reply < ApplicationRecord
    belongs_to :user
    belongs_to :status
    belongs_to :comment

    validates :status_id, presence: true
    validates :user_id, presence: true
    validates :comment_id, presence: true
    validates :content, presence: true, length: { maximum: 140 }
end
