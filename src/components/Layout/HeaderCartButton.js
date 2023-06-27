import { useContext, useEffect, useState } from "react";
import cartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartContext);
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

  const { items } = cartCtx; // use destructuring, to make bump effect only when we have some items change, and not all elements from context

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0); // 0 is initial value, necessarly

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer); //we clear timer after useEffect worked
    }
  }, [items]);
  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
