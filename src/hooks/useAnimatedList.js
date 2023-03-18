import { useCallback, useState } from "react";

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItems, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(prevState => [...prevState, id]);
  }, [])

  const handleAnimationEnd = useCallback((id) => {
    setItems(prevState => prevState.filter(item => item.id !== id));
    setPendingRemovalItemsIds (prevState => prevState.filter(itemId => itemId !== id));
  }, [])

  const renderList = useCallback((renderItem) => (
    items.map(item => renderItem(item, {
      isLeaving: pendingRemovalItems.includes(item.id)
    }))
  ), [items, pendingRemovalItems])

  return {
    items,
    setItems,
    handleAnimationEnd,
    handleRemoveItem,
    renderList
  }
}
