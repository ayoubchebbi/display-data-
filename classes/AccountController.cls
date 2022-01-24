/**
 * @description       : 
 * @author            : Ayoub CHEBBI
 * @group             : 
 * @last modified on  : 01-21-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class AccountController {
    
    /**
    * @description get Accounts List
    * @author Ayoub CHEBBI | 01-20-2022 
    * @param offset Value 
    * @return List<Account> 
    **/
    @AuraEnabled
    public static List<Account> getAccountsList(Integer offsetValue,Integer limitValue) {
        return [SELECT Id, Name, Phone, Type FROM Account LIMIT :limitValue OFFSET :offsetValue];
    }
    
    /**
    * @description get Account Number
    * @author Ayoub CHEBBI | 01-20-2022 
    * @return Account number 
    **/
    @AuraEnabled
    public static Integer getAccountNumber() {
        return ([SELECT Id FROM Account]).size();
    }
}
