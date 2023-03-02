import React, { useEffect } from "react";
import { useParams } from "react-router";
import { SubscriptionRegistration } from "./SubscriptionRegistration";
import { getSubscription } from "redux/actions/subscriptionPlan";
import { useSelector } from "react-redux";
import { Loading } from "../../components/loading.component";

export const EditSubscription = () => {
  const { subscriptionId } = useParams();

  useEffect(() => {
    if (subscriptionId) {
      getSubscription(subscriptionId);
    }
  }, [subscriptionId]);
  const subscriptionState = useSelector((state) => state);
  const {
    subscriptionGet: { loading,loaded,subscription },
    subscriptionsGet:{subscriptions}
  } = subscriptionState;
  const nn = subscriptions.find(subscription=>subscription._id==subscriptionId);
  const sub=nn ? nn : subscription
  if(!loaded && !sub){
    return <Loading />
  }else{
    return <SubscriptionRegistration action="edit" currentItem={sub} />;
  }
  
};
