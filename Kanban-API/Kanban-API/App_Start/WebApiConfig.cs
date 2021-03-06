﻿using AutoMapper;
using Kanban_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Kanban_API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            //Enable others ports for any method any header any 
            var rules = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(rules);

            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //Set API to Get JSON not XML.

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            //This is to call the function below.
            CreateMaps();
        }
        public static void CreateMaps() {
            Mapper.CreateMap<List, ListModel>();
            Mapper.CreateMap<Card, CardModel>();
        }
    }
}
