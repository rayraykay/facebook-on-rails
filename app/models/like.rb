class Like < ApplicationRecord
  belongs_to :status
  belongs_to :user

  validates :status_id, presence: true
  validates :user_id, presence: true
end
