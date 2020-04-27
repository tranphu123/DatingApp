using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API._Repositories.Interface;
using DatingApp.API._Repositories.Repositories;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.viewModel;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API._Services.Services
{
    public class ReportService : IReportService
    {
        private readonly IPoRepository _poRepository;
        private readonly IOrderPartRepository _orderPartRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _config;

        public ReportService(IPoRepository poRepository,
                            IOrderPartRepository orderPartRepository,
                            IMapper mapper,
                            MapperConfiguration config)
        {
            _poRepository = poRepository;
            _orderPartRepository = orderPartRepository;
            _mapper = mapper;
            _config = config;
        }
        public Task<bool> Add(ReportDto Model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<ReportDto>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<ReportDto>> GetAllReport(PaginationParams param)
        {
            var listPo =_poRepository.FindAll();
            var listOrderPart = _orderPartRepository.FindAll();
            var listReport =listPo.Join(listOrderPart,x=> x.PO_No,y=>y.Po_No,(x,y) => new ReportDto
            {
                Po_No = x.PO_No,
                Model_No = y.Model_No,
                Model_Name_PO = x.Model_Name,
                Model_Name_Part = y.Model_Name,
                Part_No =y.Part_No,
                Article = x.Article,
                Order = y.Order,
                Qty = x.Qty,
                CFD = x.CFD,
                Cutting_Day = x.Cutting_Day,
                Building = x.Building
            }).OrderByDescending(x=>x.Po_No);
            return await PagedList<ReportDto>.CreateAsync(listReport,param.PageNumber,param.PageSize);
        }

        public ReportDto GetByID(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<ReportDto>> GetwithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<ReportDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<ReportDto>> SearchByModel(PaginationParams param, ReportSearch model)
        {
            var listPo =_poRepository.FindAll();
            var listOrderPart = _orderPartRepository.FindAll();
            var listReport = listPo.Join(listOrderPart,x=> x.PO_No,y=>y.Po_No,(x,y) => new ReportDto
            {
                Po_No = x.PO_No,
                Model_No = y.Model_No,
                Model_Name_PO = x.Model_Name,
                Model_Name_Part = y.Model_Name,
                Part_No =y.Part_No,
                Article = x.Article,
                Order = y.Order,
                Qty = x.Qty,
                CFD = x.CFD,
                Cutting_Day = x.Cutting_Day,
                Building = x.Building
            }).Where(x=> x.Po_No.Trim() == model.po_No.Trim()).OrderByDescending(x=>x.Po_No);
            return await PagedList<ReportDto>.CreateAsync(listReport,param.PageNumber,param.PageSize);
        }

        public Task<bool> Update(ReportDto Model)
        
        {
            throw new System.NotImplementedException();
        }
        public async Task<List<ReportDto>> GetAllExcel()
        
        {
             var listPo =_poRepository.FindAll();
            var listOrderPart = _orderPartRepository.FindAll();
            var listReport = await listPo.Join(listOrderPart,x=> x.PO_No,y=>y.Po_No,(x,y) => new ReportDto
            {
                Po_No = x.PO_No,
                Model_No = y.Model_No,
                Model_Name_PO = x.Model_Name,
                Model_Name_Part = y.Model_Name,
                Part_No =y.Part_No,
                Article = x.Article,
                Order = y.Order,
                Qty = x.Qty,
                CFD = x.CFD,
                Cutting_Day = x.Cutting_Day,
                Building = x.Building
            }).ToListAsync();
            return listReport;
        }
        public async Task<List<ReportDto>> SearchExcel(ReportSearch Model)
        
        {
                  var listPo =_poRepository.FindAll();
            var listOrderPart = _orderPartRepository.FindAll();
            var listReport = await listPo.Join(listOrderPart,x=> x.PO_No,y=>y.Po_No,(x,y) => new ReportDto
            {
                Po_No = x.PO_No,
                Model_No = y.Model_No,
                Model_Name_PO = x.Model_Name,
                Model_Name_Part = y.Model_Name,
                Part_No =y.Part_No,
                Article = x.Article,
                Order = y.Order,
                Qty = x.Qty,
                CFD = x.CFD,
                Cutting_Day = x.Cutting_Day,
                Building = x.Building
            }).ToListAsync();
            listReport =listReport.Where(x=> x.Po_No.Trim() == Model.po_No.Trim()).OrderByDescending(x=>x.Po_No).ToList();
          return listReport;
        }
    }
}