class Post < ActiveRecord::Base
   after_create :trigger_event
   
   def trigger_event
	WebsocketRails[:posts].trigger('posts', self)
   end
end