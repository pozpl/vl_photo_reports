use CGI::Application::PSGI;
use Plack::Builder;
use Plack::App::File;
use JsonProxy;
 
my $app = sub {
    my $env = shift;
    my $app = JsonProxy->new({ QUERY => CGI::PSGI->new($env) });
    CGI::Application::PSGI->run($app);
};

my $app_static = Plack::App::File->new(root => "./html/")->to_app;

builder {
	mount "/" => builder {$app_static};
	mount "/index.cgi" => builder {$app};
};