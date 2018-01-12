using AutoMapper;
using GiftXchange.Models;
using GiftXchange.ViewModels.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.ViewModels.Mappings
{
  public class ViewModelToEntityMappingProfile : Profile
  {
    public ViewModelToEntityMappingProfile()
    {
      CreateMap<RegisterViewModel, GXUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.email));
    }
  }
}
