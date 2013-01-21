package WebApp;
use base 'CGI::Application';
use CGI::Application::Plugin::Routes;

  sub setup {
        my $self = shift;
                
        # routes_root optionally is used to prepend a URI part to every route
        $self->routes_root('/'); 
        $self->routes([
            '/' => 'do_stuff' ,
            '/second.cgi'  => 'second_page',
        ]);
        $self->start_mode('/');

  }
  
  
 sub do_stuff() {
    my $self = shift;   
    $self->header_add( -Content_Type => 'text/html; charset=UTF-8' );
    my $output = qq{<head></head><body><a href="second.cgi">Hello world</a></body>};
    return $output;          
 }

sub second_page(){
   my $self = shift;   
    $self->header_add( -Content_Type => 'text/html; charset=UTF-8' );
    my $output = 'Second page';
    return $output;   
}

  1;
