use CGI::Application::PSGI;
use Plack::Builder;
use WebApp;
 
my $app = sub {
    my $env = shift;
    my $app = WebApp->new({ QUERY => CGI::PSGI->new($env) });
    CGI::Application::PSGI->run($app);
};

builder {
    mount "/" => builder {$app};
};