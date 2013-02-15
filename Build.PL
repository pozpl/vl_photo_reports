use warnings;
use strict;
use Module::Build;
my $build = Module::Build->new
 (
     module_name => "JsonProxy",
     requires => {
          CGI::Application::Plugin::Routes => 0,
          CGI::Application::Plugin::Cache::File => 0,
          CGI::Application::PSGI => 0,
          Plack::Builder => 0,
          Plack::App::File => 0,
          Plack => 0,
          Starman => 0,
     },
 );
$build->create_build_script();