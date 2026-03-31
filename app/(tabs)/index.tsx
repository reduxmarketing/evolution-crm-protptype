import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// ── Design Tokens (iOS-native feel) ──
const C = {
  bg: '#f2f2f7',
  card: '#ffffff',
  text: '#1c1c1e',
  textSecondary: '#8e8e93',
  accent: '#007aff',
  green: '#34c759',
  yellow: '#ff9f0a',
  red: '#ff3b30',
  orange: '#ff9500',
  border: '#e5e5ea',
};

// ── Data ──
const FORECAST = [
  { day: 'Sat', icon: '\u26C5', hi: '82°', lo: '60°' },
  { day: 'Sun', icon: '\u2600\uFE0F', hi: '85°', lo: '63°' },
  { day: 'Mon', icon: '\u2600\uFE0F', hi: '86°', lo: '64°' },
  { day: 'Tue', icon: '\uD83C\uDF24\uFE0F', hi: '81°', lo: '61°' },
  { day: 'Wed', icon: '\u26C5', hi: '79°', lo: '59°' },
];

const TASKS_JUAN = [
  { title: 'File 20-Day Pre-Lien Notice', meta: 'Martinez Residence \u00B7 Water Damage', status: 'Overdue', color: 'red' as const },
  { title: 'Submit Supplement to State Farm', meta: 'Chen Property \u00B7 Fire Restoration', status: '2d late', color: 'red' as const },
  { title: 'Schedule Asbestos Testing', meta: 'Thompson Home \u00B7 Mold Remediation', status: 'Due today', color: 'yellow' as const },
  { title: 'Follow Up w/ Adjuster (72hr)', meta: 'Davis Residence \u00B7 Storm Damage', status: 'Tomorrow', color: 'yellow' as const },
  { title: 'Upload Final Clearance Photos', meta: 'Wilson Property \u00B7 Water Damage', status: 'Mar 10', color: 'green' as const },
];

const TASKS_MATT = [
  { title: 'Revised Estimate \u2014 24hr Turnaround', meta: 'Garcia Home \u00B7 Roof Damage', status: '5h left', color: 'red' as const },
  { title: 'Request Clearance from Lab', meta: 'Park Residence \u00B7 Mold Remediation', status: 'Due today', color: 'yellow' as const },
  { title: 'Material Selection Follow-Up', meta: 'Nguyen Property \u00B7 Kitchen Rebuild', status: 'Tomorrow', color: 'yellow' as const },
  { title: 'Send Progress Update to Homeowner', meta: 'Brooks Home \u00B7 Fire Restoration', status: 'Mar 9', color: 'green' as const },
  { title: 'Schedule Final Walkthrough', meta: 'Taylor Residence \u00B7 Water Damage', status: 'Mar 11', color: 'green' as const },
];

const PROJECTS = [
  'Martinez Residence \u2014 Water Damage',
  'Chen Property \u2014 Fire Restoration',
  'Thompson Home \u2014 Mold Remediation',
  'Davis Residence \u2014 Storm Damage',
  'Wilson Property \u2014 Water Damage',
  'Garcia Home \u2014 Roof Damage',
];

const DOT_COLORS = {
  red: { bg: C.red, shadow: 'rgba(255,59,48,0.4)' },
  yellow: { bg: C.yellow, shadow: 'rgba(255,159,10,0.4)' },
  green: { bg: C.green, shadow: 'rgba(52,199,89,0.4)' },
};

const BADGE_COLORS = {
  red: { bg: 'rgba(255,59,48,0.12)', text: '#d70015' },
  yellow: { bg: 'rgba(255,159,10,0.12)', text: '#c77c00' },
  green: { bg: 'rgba(52,199,89,0.12)', text: '#248a3d' },
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ── Toast Component ──
function Toast({ message, visible }: { message: string; visible: boolean }) {
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2000),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, message]);

  if (!visible) return null;
  return (
    <Animated.View style={[styles.toast, { opacity }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

// ── Main Screen ──
export default function HomeScreen() {
  const [photosModal, setPhotosModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [showProjectPicker, setShowProjectPicker] = useState<'photos' | 'notes' | null>(null);
  const [photoProject, setPhotoProject] = useState('');
  const [savedNotes, setSavedNotes] = useState<{ project: string; text: string; time: string }[]>([]);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const submitNote = () => {
    if (!selectedProject) { showToast('\u26A0\uFE0F Please select a project'); return; }
    if (!noteText.trim()) { showToast('\u26A0\uFE0F Please enter a note'); return; }
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setSavedNotes((prev) => [{ project: selectedProject, text: noteText.trim(), time }, ...prev]);
    setNoteText('');
    showToast('\u2705 Note saved');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Top Bar ── */}
      <LinearGradient colors={['#1c1c1e', '#2c2c2e']} style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.topTitle}>Evolution CRM</Text>
        </View>
        <LinearGradient colors={[C.accent, '#5856d6']} style={styles.avatar}>
          <Text style={styles.avatarText}>AH</Text>
        </LinearGradient>
      </LinearGradient>

      <ScrollView
        style={{ backgroundColor: C.bg }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Weather ── */}
        <LinearGradient colors={['#1b6ef3', '#4facfe', '#48b1f3']} style={styles.weatherCard}>
          <Text style={styles.weatherLocation}>{'\uD83D\uDCCD'} Phoenix, Arizona</Text>
          <View style={styles.weatherNow}>
            <Text style={styles.weatherTemp}>78°</Text>
            <Text style={styles.weatherIcon}>{'\u2600\uFE0F'}</Text>
          </View>
          <Text style={styles.weatherDesc}>Sunny · H:84° L:62°</Text>
          <View style={styles.weatherDetails}>
            <Text style={styles.weatherDetail}>{'\uD83D\uDCA7'} 8% humidity</Text>
            <Text style={styles.weatherDetail}>{'\uD83D\uDCA8'} 6 mph wind</Text>
            <Text style={styles.weatherDetail}>{'\u2601\uFE0F'} UV Index 7</Text>
          </View>
          <View style={styles.forecastDivider} />
          <View style={styles.forecastRow}>
            {FORECAST.map((f, i) => (
              <View key={i} style={styles.forecastDay}>
                <Text style={styles.forecastLabel}>{f.day}</Text>
                <Text style={styles.forecastIcon}>{f.icon}</Text>
                <Text style={styles.forecastTemps}>
                  {f.hi} <Text style={styles.forecastLo}>{f.lo}</Text>
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={() => setPhotosModal(true)}>
            <LinearGradient colors={['#ff6b6b', '#ffa500', '#ffd93d', '#6bcb77', '#4d96ff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionIcon}>
              <MaterialIcons name="photo-library" size={30} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionLabel}>Photos</Text>
            <Text style={styles.actionSub}>Upload job photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={() => setNotesModal(true)}>
            <LinearGradient colors={['#ffd60a', '#ffb800']} style={styles.actionIcon}>
              <MaterialIcons name="description" size={30} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionLabel}>Notes</Text>
            <Text style={styles.actionSub}>Add project notes</Text>
          </TouchableOpacity>
        </View>

        {/* ── My Tasks ── */}
        <Text style={styles.sectionTitle}>My Tasks</Text>

        {/* Juan Rodriguez */}
        <TaskGroup
          initials="JR"
          gradientColors={['#5856d6', '#af52de']}
          name="Juan Rodriguez"
          role="Project Manager"
          tasks={TASKS_JUAN}
        />

        {/* Matt Kowalski */}
        <TaskGroup
          initials="MK"
          gradientColors={['#ff9500', '#ff6b00']}
          name="Matt Kowalski"
          role="Project Manager"
          tasks={TASKS_MATT}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Photos Modal ── */}
      <Modal visible={photosModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Upload Photos</Text>
              <TouchableOpacity style={styles.modalClose} onPress={() => setPhotosModal(false)}>
                <Text style={styles.modalCloseText}>{'\u2715'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.formLabel}>PROJECT</Text>
              <TouchableOpacity style={styles.formSelect} onPress={() => setShowProjectPicker('photos')}>
                <Text style={photoProject ? styles.formSelectText : styles.formSelectPlaceholder}>
                  {photoProject || 'Select a project...'}
                </Text>
                <MaterialIcons name="expand-more" size={20} color={C.textSecondary} />
              </TouchableOpacity>

              <Text style={[styles.formLabel, { marginTop: 16 }]}>CATEGORY</Text>
              <View style={styles.categoryRow}>
                {['Before', 'During', 'After', 'Damage'].map((cat) => (
                  <TouchableOpacity key={cat} style={styles.categoryChip}>
                    <Text style={styles.categoryChipText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.uploadZone}>
                <Text style={{ fontSize: 36 }}>{'\uD83D\uDCF8'}</Text>
                <Text style={styles.uploadText}>Tap to upload photos</Text>
                <Text style={styles.uploadSub}>or drag & drop images here</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => {
                  if (!photoProject) { showToast('\u26A0\uFE0F Please select a project'); return; }
                  showToast('\u2705 Photos uploaded');
                  setPhotosModal(false);
                }}
              >
                <Text style={styles.btnPrimaryText}>Upload Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Notes Modal ── */}
      <Modal visible={notesModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Note</Text>
              <TouchableOpacity style={styles.modalClose} onPress={() => setNotesModal(false)}>
                <Text style={styles.modalCloseText}>{'\u2715'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.formLabel}>PROJECT</Text>
              <TouchableOpacity style={styles.formSelect} onPress={() => setShowProjectPicker('notes')}>
                <Text style={selectedProject ? styles.formSelectText : styles.formSelectPlaceholder}>
                  {selectedProject || 'Select a project...'}
                </Text>
                <MaterialIcons name="expand-more" size={20} color={C.textSecondary} />
              </TouchableOpacity>

              <Text style={[styles.formLabel, { marginTop: 16 }]}>NOTE</Text>
              <TextInput
                style={styles.formTextarea}
                placeholder="Type your note here..."
                placeholderTextColor={C.textSecondary}
                multiline
                value={noteText}
                onChangeText={setNoteText}
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.btnPrimary} onPress={submitNote}>
                <Text style={styles.btnPrimaryText}>Save Note</Text>
              </TouchableOpacity>

              {savedNotes.length > 0 && (
                <>
                  <Text style={[styles.formLabel, { marginTop: 24 }]}>RECENT NOTES</Text>
                  {savedNotes.map((n, i) => (
                    <View key={i} style={styles.savedNote}>
                      <Text style={styles.savedNoteProject}>{n.project}</Text>
                      <Text style={styles.savedNoteText}>{n.text}</Text>
                      <Text style={styles.savedNoteTime}>{n.time}</Text>
                    </View>
                  ))}
                </>
              )}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── Project Picker Modal ── */}
      <Modal visible={showProjectPicker !== null} animationType="fade" transparent>
        <TouchableOpacity style={styles.pickerOverlay} activeOpacity={1} onPress={() => setShowProjectPicker(null)}>
          <View style={styles.pickerSheet}>
            <Text style={styles.pickerTitle}>Select Project</Text>
            {PROJECTS.map((p, i) => (
              <TouchableOpacity
                key={i}
                style={styles.pickerItem}
                onPress={() => {
                  if (showProjectPicker === 'photos') setPhotoProject(p);
                  else setSelectedProject(p);
                  setShowProjectPicker(null);
                }}
              >
                <Text style={styles.pickerItemText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Toast message={toastMsg} visible={toastVisible} />
    </SafeAreaView>
  );
}

// ── Task Group Component ──
function TaskGroup({ initials, gradientColors, name, role, tasks }: {
  initials: string;
  gradientColors: [string, string];
  name: string;
  role: string;
  tasks: { title: string; meta: string; status: string; color: 'red' | 'yellow' | 'green' }[];
}) {
  return (
    <View style={styles.taskCard}>
      <View style={styles.pmHeader}>
        <LinearGradient colors={gradientColors} style={styles.pmAvatar}>
          <Text style={styles.pmInitials}>{initials}</Text>
        </LinearGradient>
        <View>
          <Text style={styles.pmName}>{name}</Text>
          <Text style={styles.pmRole}>{role}</Text>
        </View>
      </View>
      {tasks.map((task, i) => (
        <TouchableOpacity key={i} style={[styles.taskItem, i === tasks.length - 1 && { borderBottomWidth: 0 }]} activeOpacity={0.6}>
          <View style={[styles.taskDot, { backgroundColor: DOT_COLORS[task.color].bg }]} />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
            <Text style={styles.taskMeta}>{task.meta}</Text>
          </View>
          <View style={[styles.taskDue, { backgroundColor: BADGE_COLORS[task.color].bg }]}>
            <Text style={[styles.taskDueText, { color: BADGE_COLORS[task.color].text }]}>{task.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── Styles ──
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1c1c1e' },
  // Top Bar
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontSize: 15, color: 'rgba(255,255,255,0.6)' },
  topTitle: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: -0.5, marginTop: 2 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  scrollContent: { paddingBottom: 20 },

  // Weather
  weatherCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#1b6ef3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  weatherLocation: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)', letterSpacing: 0.5 },
  weatherNow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8, marginBottom: 4 },
  weatherTemp: { fontSize: 52, fontWeight: '200', color: '#fff', lineHeight: 56 },
  weatherIcon: { fontSize: 44 },
  weatherDesc: { fontSize: 15, color: 'rgba(255,255,255,0.9)', marginBottom: 12 },
  weatherDetails: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  weatherDetail: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  forecastDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 14 },
  forecastRow: { flexDirection: 'row', justifyContent: 'space-between' },
  forecastDay: { alignItems: 'center', gap: 6, flex: 1 },
  forecastLabel: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' },
  forecastIcon: { fontSize: 22 },
  forecastTemps: { fontSize: 13, fontWeight: '500', color: '#fff' },
  forecastLo: { color: 'rgba(255,255,255,0.5)', fontWeight: '400' },

  // Sections
  sectionTitle: { fontSize: 20, fontWeight: '700', color: C.text, letterSpacing: -0.3, marginHorizontal: 20, marginTop: 24, marginBottom: 12 },

  // Action Grid
  actionGrid: { flexDirection: 'row', gap: 14, paddingHorizontal: 16 },
  actionCard: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { fontSize: 14, fontWeight: '600', color: C.text },
  actionSub: { fontSize: 12, color: C.textSecondary, marginTop: -8 },

  // Task Card
  taskCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  pmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  pmAvatar: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  pmInitials: { color: '#fff', fontWeight: '700', fontSize: 13 },
  pmName: { fontSize: 15, fontWeight: '600', color: C.text },
  pmRole: { fontSize: 11, color: C.textSecondary },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  taskDot: { width: 10, height: 10, borderRadius: 5 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 14, fontWeight: '500', color: C.text },
  taskMeta: { fontSize: 12, color: C.textSecondary, marginTop: 2 },
  taskDue: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  taskDueText: { fontSize: 11, fontWeight: '600' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: C.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 36,
    height: 5,
    backgroundColor: '#d1d1d6',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: C.text },
  modalClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: { fontSize: 14, color: C.textSecondary },
  modalBody: { paddingHorizontal: 20, paddingBottom: 40 },

  // Forms
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: C.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  formSelect: {
    backgroundColor: C.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formSelectText: { fontSize: 16, color: C.text },
  formSelectPlaceholder: { fontSize: 16, color: C.textSecondary },
  formTextarea: {
    backgroundColor: C.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 140,
    color: C.text,
    lineHeight: 24,
  },
  categoryRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  categoryChip: {
    backgroundColor: C.bg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  categoryChipText: { fontSize: 13, fontWeight: '500', color: C.text },
  uploadZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#c7c7cc',
    borderRadius: 14,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: { fontSize: 15, fontWeight: '500', color: C.text, marginTop: 8 },
  uploadSub: { fontSize: 13, color: C.textSecondary, marginTop: 4 },
  btnPrimary: {
    backgroundColor: C.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Saved Notes
  savedNote: {
    backgroundColor: C.bg,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  savedNoteProject: { fontSize: 11, fontWeight: '700', color: C.accent, textTransform: 'uppercase', letterSpacing: 0.3 },
  savedNoteText: { fontSize: 14, color: C.text, marginTop: 4, lineHeight: 20 },
  savedNoteTime: { fontSize: 11, color: C.textSecondary, marginTop: 4 },

  // Picker
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  pickerSheet: {
    backgroundColor: C.card,
    borderRadius: 16,
    width: '100%',
    maxWidth: 340,
    padding: 20,
  },
  pickerTitle: { fontSize: 18, fontWeight: '700', color: C.text, marginBottom: 16 },
  pickerItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  pickerItemText: { fontSize: 15, color: C.text },

  // Toast
  toast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 200,
  },
  toastText: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
