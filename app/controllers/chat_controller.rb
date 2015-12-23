class ChatController < WebsocketRails::BaseController
  def new_message
    # Here we call the rails-websocket broadcast_message method
    Post.create(title: message)
    broadcast_message :new_message, 'Echo: From Server ' + message
  end
  
  def posts
    latest_post = Post.last
    #broadcast_message :posts, latest_post
    WebsocketRails[:posts].trigger('posts', latest_post)
  end
end