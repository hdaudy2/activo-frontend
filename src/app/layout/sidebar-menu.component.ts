import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '@shared/layout/menu-item';
import { result } from 'lodash-es';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/about';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {

        this.menuItems = this.getMenuItems();

        this.patchMenuItems(this.menuItems);

        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    getMenuItems(): MenuItem[] {
        return [

            // new MenuItem(this.l('Dashboard'), '/app/pages/master-setups/dashboard', 'fas fa-home', this.permissionCheck('dashboard')),
            //new MenuItem(this.l('HomePage'),'/app/home', 'fas fa-home'),
            // new MenuItem(
            //     'Home',
            //     '/app/home',
            //     'fas fa-book'

            // ),
            // new MenuItem(this.l('Main Appliation'), '', 'fas fa-cubes', '', [
            //Stock Management
            // new MenuItem(this.l('Library'), '', 'fas fa-book', this.permissionCheckParent(['LibraryResources']), [

            new MenuItem(this.l('Library'), '', 'fas fa-book', this.permissionCheckParent(['Library-no']), [

                new MenuItem(
                    'Library Resources',
                    '/app/pages/stock-management/indenting-maker-list',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('LibraryResources')
                ),



            ]),
            // new MenuItem(this.l('Operations'), '', 'fas fa-book', this.permissionCheckParent(['AuditPlan', 'Clients', 'Agency', 'AllAgencyProjects']), [
            new MenuItem(this.l('Operations'), '', 'fas fa-book', this.permissionCheckParent(['Operations-no']), [

                new MenuItem(
                    'Audits',
                    '/app/pages/sales/audit-plan-list',
                    'fas fa-user-check',
                    this.permissionCheck('AuditPlanList')
                ),
                new MenuItem(
                    'Clients',
                    '/app/pages/sales/task-board-list',
                    'fas fa-user-edit',
                    this.permissionCheck('Clients')
                ),
                new MenuItem(
                    'Holiday',
                    '/app/pages/calendar/holiday-calendar',
                    'fas fa-user-check',
                    this.permissionCheck('HolidayCalendar')
                ),
                new MenuItem(
                    'Branch Office',
                    '/app/pages/security-module/agency-task-board',
                    'fas fa-user-check',
                    this.permissionCheck('Agency')
                ),

                new MenuItem(
                    'Client Projects',
                    '/app/pages/sales/all-projects',
                    'fas fa-user-edit',
                    this.permissionCheck('AllAgencyProjects')
                ),
                new MenuItem(
                    'Project Amount',
                    '/app/pages/master-setups/project-amount',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('ProjectAmount')
                ),
                new MenuItem(
                    'Consultant',
                    '/app/pages/Operations/consultant',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Consultant')
                ),
                new MenuItem(
                    'Project Ledger',
                    '/app/pages/reports/project-amount-reports',
                    'fas fa-user-edit',
                    this.permissionCheck('ProjectAmountReports')
                ),
                // new MenuItem(
                //     'DASHBOAD',
                //     '/app/pages/master-setups/dashboard',
                //     'fas fa-user-edit',
                //     this.permissionCheck('dashboard')
                // ),
                // new MenuItem(
                //     'AllProjects',
                //     '/app/pages/sales/all-projects',
                //     'fas fa-user-edit',
                //     this.permissionCheck('AllProjects')
                // ),

            ]),
            //       new MenuItem(this.l('Operations'), '', 'fas fa-book', this.permissionCheckParent(['Agency','AllProjects']), [



            //         new MenuItem(
            //             'Agency',
            //             '/app/pages/security-module/agency-task-board',
            //             'fas fa-user-check',
            //             this.permissionCheck('Agency')
            //         ),

            //             new MenuItem(
            //                 'Client Projects',
            //                 '/app/pages/sales/all-projects',
            //                 'fas fa-user-edit',
            //                 this.permissionCheck('AllProjects')
            //             ),


            //   ]),
            //Sales
            //  new MenuItem(this.l('Master Setups'), '', 'fas fa-certificate', this.permissionCheckParent(['Standard','Modules']), [


            //     new MenuItem(
            //         'Standard',
            //         '/app/pages/certification-setups/certificate',
            //         'fas fa-arrow-circle-right',
            //         this.permissionCheck('Standard')
            //     ),
            //     new MenuItem(
            //         'Modules',
            //         '/app/pages/certification-setups/module',
            //         'fas fa-arrow-circle-right',
            //         this.permissionCheck('Modules')
            //     ),


            //  ]),










            //Security Group


            // new MenuItem(this.l('Master Setups'), '', 'fas fa-certificate', this.permissionCheckParent(['Standard', 'Modules', 'DocumentType', 'StandardType', 'ApplicationType', 'AudditorType', 'Country', 'State', 'City', 'CertificationBody', 'EaCode', 'NaceCode', 'CourseType', 'Section', 'Legislation', 'Accreditation', 'ProjectAmount']), [
            new MenuItem(this.l('Master Setups'), '', 'fas fa-certificate', this.permissionCheckParent(['Master Setups-no']), [


                new MenuItem(
                    'Standard',
                    '/app/pages/certification-setups/certificate',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Standard')
                ),
                new MenuItem(
                    'Modules',
                    '/app/pages/certification-setups/module',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Modules')
                ),
                new MenuItem(
                    'Document Type',
                    '/app/pages/master-setups/document-type',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('DocumentType')
                ),
                new MenuItem(
                    'Standard Type',
                    '/app/pages/master-setups/standard-type',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('StandardType')
                ),
                new MenuItem(
                    'ApplicationType',
                    '/app/pages/master-setups/application-type',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('ApplicationType')
                ),
                new MenuItem(
                    'AuditorType',
                    '/app/pages/master-setups/audditor-type',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('AudditorType')
                ),
                new MenuItem(
                    'Country',
                    '/app/pages/master-setups/country',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Country')
                ),
                new MenuItem(
                    'State',
                    '/app/pages/master-setups/state',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('State')
                ),
                new MenuItem(
                    'City',
                    '/app/pages/master-setups/city',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('City')
                ),
                new MenuItem(
                    'Certification Body',
                    '/app/pages/master-setups/certification-body',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('CertificationBody')
                ),
                new MenuItem(
                    'Ea Code',
                    '/app/pages/master-setups/ea-code',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('EaCode')
                ),
                new MenuItem(
                    'Nace Code',
                    '/app/pages/master-setups/nace-code',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('NaceCode')
                ),
                // new MenuItem(
                //     'Course Type',
                //     '/app/pages/master-setups/course-type',
                //     'fas fa-arrow-circle-right',
                //     this.permissionCheck('CourseType')
                // ),
                new MenuItem(
                    'Section',
                    '/app/pages/master-setups/section',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Section')
                ),
                new MenuItem(
                    'Legislation',
                    '/app/pages/master-setups/legislation',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Legislation')
                ),
                new MenuItem(
                    'Accreditation',
                    '/app/pages/master-setups/accreditation',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('Accreditation')
                ),
                new MenuItem(
                    'Qc Questions',
                    '/app/pages/master-setups/qc-document',
                    'fas fa-arrow-circle-right',
                    this.permissionCheck('QcDocument')
                ),


                //     new MenuItem(
                //         'Authorizer Form',
                //         '/app/pages/sales/authorizer-form-task-board',
                //         'fas fa-arrow-circle-right'
                //     ),
                //     // new MenuItem(
                //     //     'Nadra SC Clearing',
                //     //     '/app/pages/sales/nadra-screening-authorizer',
                //     //     'far fa-circle'
                //     // )
            ]),

            new MenuItem(this.l('User Management'), '', 'fas fa-users', this.permissionCheckParent(['User Management-no']), [
                new MenuItem(
                    'Users',
                    '/app/pages/security-module/user-with-locations-task-board',
                    'fas fa-user-edit',
                    this.permissionCheck('User')
                ),

                // new MenuItem(
                //     'Roles Maker',
                //     '/app/pages/security-module/roles-master',
                //     'fas fa-stamp',
                //     this.permissionCheck('Role')
                // ),
                // new MenuItem(
                //     'Roles Authorizer',
                //     '/app/pages/security-module/roles-with-permission-authorizer-task-board',
                //     'fas fa-user-check',
                //     this.permissionCheck('Role')
                // ),

            ]),
            new MenuItem(this.l('Reports'), '', 'fas fa-users', this.permissionCheckParent(['Reports']), [
                new MenuItem(
                    'Project Ledger',
                    '/app/pages/reports/project-amount-reports',
                    'fas fa-user-edit',
                    this.permissionCheck('ProjectAmountReports')
                ),

                // new MenuItem(
                //     'Roles Maker',
                //     '/app/pages/security-module/roles-master',
                //     'fas fa-stamp',
                //     this.permissionCheck('Role')
                // ),
                // new MenuItem(
                //     'Roles Authorizer',
                //     '/app/pages/security-module/roles-with-permission-authorizer-task-board',
                //     'fas fa-user-check',
                //     this.permissionCheck('Role')
                // ),

            ]),
            new MenuItem(this.l('Dashboard'), '/app/home', 'fas fa-home', this.permissionCheck('dashboard')),
            new MenuItem(this.l('Buildings'), '/app/buildings', 'fas fa-building', this.permissionCheckParent(['Building'])),
            new MenuItem(this.l('Clients'), '/app/clients', 'fas fa-users', this.permissionCheckParent(['Client'])),
            new MenuItem(this.l('User Management'), '/app/userManagement', 'fas fa-users', this.permissionCheckParent(['UserManagement'])),
             new MenuItem(this.l('Manage Building'), '/app/buildings/manage', 'fas fa-building', this.permissionCheckParent(['BuildingManage'])),
            new MenuItem(this.l('Service Requests'), '/app/services/service-request-list', 'fas fa-envelope', this.permissionCheckParent(['ServiceRequestList'])),
            new MenuItem(this.l('Utility'), '', 'fas fa-cogs', this.permissionCheckParent(['Utility']), [
                new MenuItem(
                    'Service Type',
                    '/app/utility/serviceType',
                    'fas fa-cog',
                    this.permissionCheck('ServiceType')
                ),
            ]),
        ];
    }

    // permissionCheckParent(obj: any): any {
    //     let permissions: any = [];
    //     permissions = JSON.parse(localStorage.getItem('secRoleForm'));
    //     let per: any = [];

    //     for (let i = 0; i < obj.length; i++) {

    //         var test = permissions.some(x => x.formCode == obj[i]);
    //         if (test != null && test != undefined && test != "" && test != NaN && test != '') { per.push(test) }
    //         //return  permissions.some(x => x.formCode == obj[i]);
    //     }
    //     
    //     return per
    // }
    permissionCheckParent(obj: any): any {
        let permissions: any = [];
        permissions = JSON.parse(localStorage.getItem('secRoleForm'));
        //let per:any=[];

        for (let i = 0; i < obj.length; i++) {

            //var test=  permissions.some(x => x.formCode == obj[i]);
            //if(test!=null && test!=undefined && test!="" && test!=NaN && test!='')
            // {per.push(test)}
            return permissions.some(x => x.formCode == obj[i]);
        }
        //return per
    }
    permissionCheck(data: any): any {
        let permissions: any = [];
        permissions = JSON.parse(localStorage.getItem('secRoleForm'));

        return permissions.some(x => x.formCode == data);


    }
    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (item.permissionName) {
            return true;
        }
        // return this.permission.isGranted(item.permissionName);
    }
}
