import { useCallback, useRef, useState, createRef } from "react";

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItems, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(prevState => [...prevState, id]);
  }, [])

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems(prevState => prevState.filter(item => item.id !== id));
  //   setPendingRemovalItemsIds (prevState => prevState.filter(itemId => itemId !== id));
  // }, [])

  // const animatedElementRef = useRef(null);

  // useEffect(() => {
  //   function handleAnimationEnd() {
  //     onAnimationEnd(message.id);
  //   }

  //   const elementRef = animatedElementRef.current;

  //   if(isLeaving){
  //     elementRef.addEventListener('animationend', handleAnimationEnd);
  //   }

  //   return () => {
  //     elementRef.removeEventListener('animationend', handleAnimationEnd);
  //   }
  // }, [isLeaving, message.id, onAnimationEnd]);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if(!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.get(itemId, animatedRef);
    }

    return animatedRef;
  }, [])

  const renderList = useCallback((renderItem) => (
    items.map(item => {
      const isLeaving = pendingRemovalItems.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef })
    })
  ), [items, pendingRemovalItems])

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList
  }
}
