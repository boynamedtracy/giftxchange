using GiftXchange.Data;
using GiftXchange.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;

namespace GiftXchange
{
  public class Startup
  {

    private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
    private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddDbContext<GXContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
          sqlOptions => sqlOptions.MigrationsAssembly("GiftXchange")));

      services.AddIdentity<GXUser, GXRole>()
        .AddEntityFrameworkStores<GXContext>()
        .AddDefaultTokenProviders();


      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseAuthentication();


      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseMvc();
    }
  }
}
