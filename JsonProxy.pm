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
            '/get/json/:event_id/:period_id' => 'get_one',
        ]);
        $self->start_mode('/');

  }
  
  
 sub get_all() {
    my $self = shift;
#    my $url = 'http://vl.ru/ajax/getlastphotoreports/party/10';
    my $url = 'http://rest.loc/ajax/getlastphotoreports/party/10';
    my $cache_key = $url;
    my $json = $self->cache->get($cache_key);
    if(!$json){
		$json = get( $url );
		die "Could not get $url!" unless defined $json;
		$self->cache->set($cache_key, $json);
    }
    return $json;
 }

 sub get_one(){
    my $self  = shift;
    my $q     = $self->query();
	my $event_id  = $q->param('event_id');
    my $period_id    = $q->param('period_id');
    #    my $url = 'http://vl.ru/ajax/getlastphotoreports/party/10';
    my $url = "http://rest.loc//ajax/event/photoreport/$event_id/$period_id";
    my $cache_key = $url;
    my $json = $self->cache->get($cache_key);
    if(!$json){
    $json = get( $url );
    	die "Could not get $url!" unless defined $json;
    	$self->cache->set($cache_key, $json);
    }
    return $json;
 }

1;
