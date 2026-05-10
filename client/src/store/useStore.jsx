import { createContext, useContext, useReducer, useCallback } from "react";
import {
  allFaculty,
  allVenues,
  initialPSSlots,
  initialPBLSlots,
  initialLabApprovals,
  initialAPApprovals,
  initialFacultySlotMap,
} from "../data/index";

// ── INITIAL STATE ────────────────────────────────────────────────
const initialState = {
  currentPage: "dashboard",
  darkMode: localStorage.getItem("admin-dark") === "1",

  faculty: allFaculty.map((f) => ({ ...f })),
  venues: allVenues.map((v) => ({ ...v })),
  psSlots: initialPSSlots.map((s) => ({ ...s })),
  pblSlots: initialPBLSlots.map((s) => ({ ...s })),
  labApprovals: initialLabApprovals.map((a) => ({ ...a })),
  apApprovals: initialAPApprovals.map((a) => ({ ...a })),
  facultySlotMap: JSON.parse(JSON.stringify(initialFacultySlotMap)),

  toast: { msg: "", isError: false, visible: false },
};

// ── REDUCER ──────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "NAVIGATE":
      return { ...state, currentPage: action.page };

    case "TOGGLE_DARK": {
      const next = !state.darkMode;
      localStorage.setItem("admin-dark", next ? "1" : "0");
      return { ...state, darkMode: next };
    }

    case "SHOW_TOAST":
      return { ...state, toast: { msg: action.msg, isError: action.isError, visible: true } };

    case "HIDE_TOAST":
      return { ...state, toast: { ...state.toast, visible: false } };

    // ── VENUE: swap faculty (same venue, new incharge) ────────────
    case "SWAP_FACULTY": {
      const { venueId, newFacultyId } = action;
      return {
        ...state,
        venues: state.venues.map((v) =>
          v.id === venueId ? { ...v, transferredTo: newFacultyId } : v
        ),
      };
    }

    // ── VENUE: move faculty to another venue ──────────────────────
    case "MOVE_VENUE": {
      const { fromVenueId, toVenueId } = action;
      const fromV = state.venues.find((v) => v.id === fromVenueId);
      const facId = fromV.faculty;
      const newVenues = state.venues.map((v) => {
        if (v.id === fromVenueId)
          return { ...v, faculty: null, slot: null, status: "free", transferredTo: null };
        if (v.id === toVenueId)
          return { ...v, faculty: facId, slot: fromV.slot, status: "occupied" };
        return v;
      });
      const newFaculty = state.faculty.map((f) => {
        if (f.id !== facId) return f;
        const fromName = fromV.name;
        const toName = state.venues.find((v) => v.id === toVenueId).name;
        return {
          ...f,
          venues: [...f.venues.filter((x) => x !== fromName), toName],
        };
      });
      return { ...state, venues: newVenues, faculty: newFaculty };
    }

    // ── VENUE: revoke transfer ────────────────────────────────────
    case "REVOKE_TRANSFER":
      return {
        ...state,
        venues: state.venues.map((v) =>
          v.id === action.venueId ? { ...v, transferredTo: null } : v
        ),
      };

    // ── FACULTY: transfer single slot ────────────────────────────
    case "TRANSFER_SINGLE_SLOT": {
      const { fromFacultyId, slotId, toFacultyId } = action;
      const fromSlots = state.facultySlotMap[fromFacultyId] || [];
      const slot = fromSlots.find((s) => s.id === slotId);
      if (!slot) return state;

      const newMap = { ...state.facultySlotMap };
      newMap[fromFacultyId] = fromSlots.filter((s) => s.id !== slotId);
      const toSlots = newMap[toFacultyId] ? [...newMap[toFacultyId]] : [];
      toSlots.push({
        ...slot,
        id: toFacultyId + "-S" + (toSlots.length + 1),
      });
      newMap[toFacultyId] = toSlots;

      const newFaculty = state.faculty.map((f) => {
        if (f.id === fromFacultyId) return { ...f, slots: newMap[fromFacultyId].length };
        if (f.id === toFacultyId) return { ...f, slots: newMap[toFacultyId].length };
        return f;
      });

      return { ...state, facultySlotMap: newMap, faculty: newFaculty };
    }

    // ── FACULTY: transfer all slots ───────────────────────────────
    case "TRANSFER_ALL_SLOTS": {
      const { fromFacultyId, toFacultyId } = action;
      const fromSlots = state.facultySlotMap[fromFacultyId] || [];
      const newMap = { ...state.facultySlotMap };
      const toSlots = newMap[toFacultyId] ? [...newMap[toFacultyId]] : [];
      fromSlots.forEach((s) => {
        toSlots.push({ ...s, id: toFacultyId + "-S" + (toSlots.length + 1) });
      });
      newMap[fromFacultyId] = [];
      newMap[toFacultyId] = toSlots;

      const newFaculty = state.faculty.map((f) => {
        if (f.id === fromFacultyId) return { ...f, slots: 0, venues: [] };
        if (f.id === toFacultyId) return { ...f, slots: toSlots.length };
        return f;
      });

      return { ...state, facultySlotMap: newMap, faculty: newFaculty };
    }

    // ── LAB APPROVAL ─────────────────────────────────────────────
    case "UPDATE_LAB_APPROVAL":
      return {
        ...state,
        labApprovals: state.labApprovals.map((a) =>
          a.id === action.id ? { ...a, status: action.status } : a
        ),
      };

    // ── AP APPROVAL ──────────────────────────────────────────────
    case "UPDATE_AP_APPROVAL":
      return {
        ...state,
        apApprovals: state.apApprovals.map((a) =>
          a.id === action.id ? { ...a, status: action.status } : a
        ),
      };

    // ── PS SLOT ADD / DELETE ──────────────────────────────────────
    case "ADD_PS_SLOT":
      return {
        ...state,
        psSlots: [...state.psSlots, { ...action.slot, id: "PS0" + (state.psSlots.length + 1) }],
      };
    case "DELETE_PS_SLOT":
      return {
        ...state,
        psSlots: state.psSlots.filter((_, i) => i !== action.index),
      };

    // ── PBL SLOT ADD / DELETE ─────────────────────────────────────
    case "ADD_PBL_SLOT":
      return {
        ...state,
        pblSlots: [...state.pblSlots, { ...action.slot, id: "PBL0" + (state.pblSlots.length + 1) }],
      };
    case "DELETE_PBL_SLOT":
      return {
        ...state,
        pblSlots: state.pblSlots.filter((_, i) => i !== action.index),
      };

    default:
      return state;
  }
}

// ── CONTEXT ──────────────────────────────────────────────────────
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useCallback((page) => dispatch({ type: "NAVIGATE", page }), []);

  const toggleDark = useCallback(() => dispatch({ type: "TOGGLE_DARK" }), []);

  const showToast = useCallback((msg, isError = false) => {
    dispatch({ type: "SHOW_TOAST", msg, isError });
    setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 3000);
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch, navigate, toggleDark, showToast }}>
      {children}
    </StoreContext.Provider>
  );
}

// ── HOOK ─────────────────────────────────────────────────────────
export function useStore() {
  return useContext(StoreContext);
}
