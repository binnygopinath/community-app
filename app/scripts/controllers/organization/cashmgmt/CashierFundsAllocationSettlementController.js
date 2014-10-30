(function (module) {
    mifosX.controllers = _.extend(module, {
        CashierFundsAllocationSettlementController: function (scope, routeParams, route, location, dateFilter, resourceFactory) {

            resourceFactory.cashierTxnTemplateResource.get({tellerId: routeParams.tellerId, cashierId: routeParams.cashierId}, function (data) {
                scope.cashierTxnTemplate = data;
            });

            scope.ifAllocate = function(){
                if ( routeParams.action == 'allocate') {
                    return true;
                }
            };

            scope.ifSettle = function(){
                if ( routeParams.action == 'settle') {
                    return true;
                }
            };

            scope.allocate = function () {
                this.formData.locale = scope.optlang.code;
                var tDate = dateFilter(scope.txnDate, scope.df);
                this.formData.dateFormat = scope.df;
                this.formData.txnDate = tDate;
                resourceFactory.tellerCashierTxnsAllocateResource.allocate(
                    {'tellerId': routeParams.tellerId, 'cashierId': routeParams.cashierId}, 
                    this.formData, function (data) {
                        location.path('tellers/' + routeParams.tellerId + '/cashiers/' + routeParams.cashierId + '/txns');
                });
            }; 

            scope.settle = function () {
                this.formData.locale = scope.optlang.code;
                var tDate = dateFilter(scope.txnDate, scope.df);
                this.formData.dateFormat = scope.df;
                this.formData.txnDate = tDate;
                resourceFactory.tellerCashierTxnsSettleResource.settle(
                    {'tellerId': routeParams.tellerId, 'cashierId': routeParams.cashierId}, 
                    this.formData, function (data) {
                        location.path('tellers/' + routeParams.tellerId + '/cashiers/' + routeParams.cashierId + '/txns');
                });
            }; 
        }
    });
    mifosX.ng.application.controller('CashierFundsAllocationSettlementController', ['$scope', '$routeParams', '$route', '$location', 'dateFilter', 'ResourceFactory', mifosX.controllers.CashierFundsAllocationSettlementController]).run(function ($log) {
        $log.info("CashierFundsAllocationSettlementController initialized");
    });
}(mifosX.controllers || {}));
