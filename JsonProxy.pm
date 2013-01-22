package JsonProxy;

use warnings;
use strict;

use base 'CGI::Application';
use CGI::Application::Plugin::Routes;
use CGI::Application::Plugin::Cache::File;
use LWP::Simple;

  sub cgiapp_init{
    my $self = shift;
    $self->cache_config(
            cache_root      => '/tmp/cache',
            default_expires => '600 seconds'
        );
  }
  sub setup {
        my $self = shift;
                
        # routes_root optionally is used to prepend a URI part to every route
        $self->routes_root('/'); 
        $self->routes([
            '/get/json/all' => 'get_all' ,
            '/second.cgi'  => 'second_page',
        ]);
        $self->start_mode('/');

  }
  
  
 sub get_all() {
    my $self = shift;
    my $url = 'http://vl.ru/ajax/getlastphotoreports/party/10';
	my $json = get( $url );
    die "Could not get $url!" unless defined $json;
    return $json;
 }

sub second_page(){
   my $self = shift;   
    $self->header_add( -Content_Type => 'text/html; charset=UTF-8' );
    my $output = 'Second page';
    return $output;   
}

  1;
