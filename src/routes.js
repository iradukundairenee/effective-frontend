import React from "react";
import { Redirect } from "react-router-dom";
import { DashboardLayout } from "layouts/dashboard";
import SetPassword from "pages/set.password.page";
import { ProjectPage } from "pages/Project";
import { ProjectRegistration } from "pages/Project/ProjectRegistration";
import { EditProject } from "pages/Project/ProjectModification";
import { QuotePage } from "pages/Quote";
import { QuoteDetails } from "pages/QuoteDetails/QouteDetails";
import { ProposalPage } from "pages/Quote/AddProposals";
import { InvoicePage, CurrencyPage } from "pages/Invoice";
import { ItemsPage } from "pages/ProposalItems"
import { InvoiceDetails } from "pages/Invoice/InvoiceDetails";
import { SubscriptionPage } from "pages/Subscription";
import { ViewPublicSubscription } from "pages/Subscription/ViewPublicSubcription";
import { ViewPrivateSubscription } from "pages/Subscription/ViewPrivateSubscription";
import { SubscriptionRegistration } from "pages/Subscription/SubscriptionRegistration";
import { store } from "redux/store";
import { CustomerPage } from "pages/Customer";
import { EditProfile, ViewProfile } from "./pages/UserProfile";
import { LoginPage } from "pages/Login";
import { OldLoginPage } from "pages/Login/Login_old";
import { ProjectDetailPage } from "pages/ProjectDetail";
import { ProductPage } from "pages/Product";
import { ProductQrPage } from "pages/ProductQr";
import { ProductViewPage } from "pages/ProductView";
import { ProductRegistration } from "pages/Product/ProductRegistraction";
import { EditProduct } from "pages/Product/EditProduct";
import { AnalyticsPage } from "pages/Analytics";
import { SingleAnalyticsPage } from "pages/Analytics";
import { CouponsPage } from "pages/Coupons";
import { CrmPage } from "pages/CRM";
import { EditSubscription } from "pages/Subscription/subscriptionModification";
import { CreateCurrency } from "pages/Invoice/currencyRegistration";
import { AdminSubscription } from "pages/Subscription/adminSubscription";
import { EditCurrency } from "pages/Invoice/editCurrency";
import { RegisterUser } from "pages/CRM/registerUser";
import { EmployeePage } from "pages/CRM/Employees";
import { RegisterEmployee } from "pages/CRM/addEmployee";
import { CrmProjectPage } from "pages/CRM/CrmProjectPage";
import { LoyaltyPointsPage } from "pages/LoyaltyPoints/LoyaltyPoints";
import { AddLoyaltyPoints } from "pages/LoyaltyPoints/AddLoyaltyPoint";
import { CrmSubscriptionPage } from "pages/CRM/CrmSubscriptionPage";
import { CreateCoupon } from "pages/Coupons/createCoupons";
import { SessionsPage } from "pages/CRM/crmSessionsPage";
import { AnalyticsDashboard } from "pages/dashboard";
import { CouponUpdate } from "pages/Coupons/couponUpdate";
import { LoyaltyPointsUpdate } from "pages/LoyaltyPoints/loyaltyPointsUpdate";
import { ViewCoupon } from "pages/Coupons/viewCoupon";
import { PaymentStatus } from "pages/payments/paymentStatus";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/dashboard/logout",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/old",
    exact: true,
    component: OldLoginPage,
  },

  {
    path: "/set-password/:token",
    exact: true,
    component: SetPassword,
  },
  {
    path: "/set-password/:token/:action",
    exact: true,
    component: SetPassword,
  },
  {
    path: "/dashboard/products/:productId",
    exact: true,
    component: ProductViewPage,
  },
  {
    path: "/dashboard/qr/product/:productId/:code",
    exact: true,
    component: ProductQrPage,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    routes: [
      {
        path: "/dashboard/home",
        exact: true,
        component: AnalyticsDashboard,
      },
      {
        path: "/dashboard/customers",
        exact: true,
        component: CustomerPage,
      },
      {
        path: "/dashboard/projects",
        exact: true,
        component: ProjectPage,
      },
      {
        path: "/dashboard/add-project",
        exact: true,
        component: ProjectRegistration,
      },
      {
        path: "/dashboard/editproject/:projectId",
        exact: true,
        component: EditProject,
      },
      {
        path: "/dashboard/products",
        exact: true,
        component: ProductPage,
      },
      {
        path: "/dashboard/viewProjectProduct/:projectId",
        exact: true,
        component: ProductPage,
      },
      {
        path: "/dashboard/editproduct/:productId",
        exact: true,
        component: EditProduct,
      },
      {
        path: "/dashboard/add-product",
        exact: true,
        component: ProductRegistration,
      },
      {
        path: "/dashboard/add-project",
        exact: true,
        component: ProjectRegistration,
      },
      {
        path: "/dashboard/projects/:projectId",
        exact: true,
        component: ProjectDetailPage,
      },
      {
        path: "/dashboard/quotes",
        exact: true,
        component: QuotePage,
      },
      {
        path: "/dashboard/addproposals",
        exact: true,
        component: ProposalPage,
      },
      {
        path: "/dashboard/quotes/:quoteId",
        exact: true,
        component: QuoteDetails,
      },
      {
        path: "/dashboard/invoices",
        exact: true,
        component: InvoicePage,
      },
      {
        path: "/dashboard/invoices/:invoiceId",
        exact: true,
        component: InvoiceDetails,
      },
      {
        path: "/dashboard/currencies",
        exact: true,
        component: CurrencyPage,
      },
      {
        path: "/dashboard/items",
        exact: true,
        component: ItemsPage,
      },
      {
        path: "/dashboard/currencies/createCurrency",
        exact: true,
        component: CreateCurrency,
      },
      {
        path: "/dashboard/currencies/updateCurrency/:currencyId",
        exact: true,
        component: EditCurrency,
      },
      {
        path: "/dashboard/subscriptions/:subscriptionId",
        exact: true,
        component: EditSubscription,
      },
      {
        path: "/dashboard/subscriptionsList",
        exact: true,
        component: AdminSubscription,
      },
      {
        path: "/dashboard/subscriptions",
        exact: true,
        component: SubscriptionPage,
      },
      {
        path: "/dashboard/payment",
        exact: true,
        component: PaymentStatus,
      },
      {
        path: "/dashboard/add-subscriptions",
        exact: true,
        component: SubscriptionRegistration,
      },
      {
        path: "/dashboard/subscriptionPlans/:subscriptionId",
        exact: true,
        component: ViewPublicSubscription,
      },
      {
        path: "/dashboard/subscriptionPlans/:subscriptionId/private",
        exact: true,
        component: ViewPrivateSubscription,
      },
      {
        path: "/dashboard/view-profile",
        exact: true,
        component: ViewProfile,
      },
      {
        path: "/dashboard/editprofile",
        exact: true,
        component: EditProfile,
      },
      {
        path: "/dashboard/analytics",
        exact: true,
        component: AnalyticsPage,
      },
      {
        path: "/dashboard/SingleAnalytics/:analyticId",
        exact: true,
        component: SingleAnalyticsPage,
      },
      {
        path: "/dashboard/coupons",
        exact: true,
        component: CouponsPage,
      },
      {
        path: "/dashboard/coupons/update/:couponId",
        exact: true,
        component: CouponUpdate,
      },
      {
        path: "/dashboard/coupons/create",
        exact: true,
        component: CreateCoupon,
      },
      {
        path: "/dashboard/coupons/view/:couponId",
        exact: true,
        component: ViewCoupon,
      },
      {
        path: "/dashboard/crm",
        exact: true,
        component: CrmPage,
      },
      {
        path: "/dashboard/crm/projects/:type/:id",
        exact: true,
        component: CrmProjectPage,
      },
      {
        path: "/dashboard/crm/subscription/:id",
        exact: true,
        component: CrmSubscriptionPage,
      },
      {
        path: "/dashboard/crm/createUser",
        exact: true,
        component: RegisterUser,
      },
      {
        path: "/dashboard/crm/add-employee",
        exact: true,
        component: RegisterEmployee,
      },
      {
        path: "/dashboard/crm/employees",
        exact: true,
        component: EmployeePage,
      },
      {
        path: "/dashboard/crm/userSessions/:userId",
        exact: true,
        component: SessionsPage,
      },
      {
        path: "/dashboard/loyaltypoints",
        exact: true,
        component: LoyaltyPointsPage,
      },
      {
        path: "/dashboard/loyaltypoints/add",
        exact: true,
        component: AddLoyaltyPoints,
      },
      {
        path: "/dashboard/loyaltypoints/update/:pointsId",
        exact: true,
        component: LoyaltyPointsUpdate,
      },
    ],
  },
  {
    component: () => <Redirect to="/dashboard/home" />,
  },
];
export default routes;
