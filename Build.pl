use warnings;
use strict;
use Module::Build;
my $build = Module::Build->new
 (
     module_name => "JsonProxy",
     requires => {
          CGI::Application::Plugin::Routes => 0,
          CGI::Application::Plugin::Cache::File => 0,
     },
 );
$build->create_build_script();