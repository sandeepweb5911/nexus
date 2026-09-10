import { Router } from 'express';
import { authController } from '../controllers/authController';
import { toolController } from '../controllers/toolController';
import { interactionController } from '../controllers/interactionController';
import { authenticate, optionalAuthenticate, requireRole } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { registerSchema, loginSchema, toolCreateSchema, reviewCreateSchema, submissionCreateSchema } from '../validators';

const router = Router();

// ===================== AUTHENTICATION =====================
router.post('/auth/register', validateBody(registerSchema), authController.register);
router.post('/auth/login', validateBody(loginSchema), authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticate, authController.me);

// ===================== SEARCH & DISCOVERY =====================
router.get('/tools/search', toolController.searchTools);
router.get('/tools/new', toolController.getNewTools);
router.get('/trending', toolController.getTrending);

// ===================== AI TOOLS =====================
router.get('/tools', toolController.getTools);
router.get('/tools/:slug', toolController.getToolBySlug);
router.post('/tools', authenticate, requireRole(['ADMIN', 'SUPER_ADMIN']), validateBody(toolCreateSchema), toolController.createTool);
router.put('/tools/:id', authenticate, requireRole(['ADMIN', 'SUPER_ADMIN']), toolController.updateTool);
router.delete('/tools/:id', authenticate, requireRole(['ADMIN', 'SUPER_ADMIN']), toolController.deleteTool);
router.post('/tools/:id/click', toolController.trackClick);

// ===================== CATEGORIES =====================
router.get('/categories', interactionController.getCategories);
router.get('/categories/:slug', interactionController.getCategoryBySlug);

// ===================== FAVORITES =====================
router.get('/favorites', optionalAuthenticate, interactionController.getFavorites);
router.post('/favorites/:toolId', optionalAuthenticate, interactionController.addFavorite);
router.delete('/favorites/:toolId', optionalAuthenticate, interactionController.removeFavorite);

// ===================== COMPARE =====================
router.get('/compare', interactionController.getCompare);
router.post('/compare', interactionController.setCompare);
router.delete('/compare/:toolId', interactionController.removeCompareTool);

// ===================== REVIEWS =====================
router.get('/tools/:toolId/reviews', interactionController.getReviews);
router.post('/tools/:toolId/reviews', optionalAuthenticate, validateBody(reviewCreateSchema), interactionController.createReview);
router.put('/reviews/:id', authenticate, interactionController.updateReview);
router.delete('/reviews/:id', authenticate, interactionController.deleteReview);

// ===================== DEALS =====================
router.get('/deals', interactionController.getDeals);
router.get('/deals/:id', interactionController.getDealById);

// ===================== TOOL SUBMISSION =====================
router.post('/submissions', optionalAuthenticate, validateBody(submissionCreateSchema), interactionController.createSubmission);
router.get('/submissions/my', authenticate, interactionController.getMySubmissions);

// ===================== ADMIN =====================
router.get('/admin/tools', toolController.getTools);
router.post('/admin/tools', validateBody(toolCreateSchema), toolController.createTool);
router.put('/admin/tools/:id', toolController.updateTool);
router.delete('/admin/tools/:id', toolController.deleteTool);

router.get('/admin/submissions', interactionController.getAdminSubmissions);
router.put('/admin/submissions/:id/approve', interactionController.approveSubmission);
router.put('/admin/submissions/:id/reject', interactionController.rejectSubmission);

router.get('/admin/users', interactionController.getAdminUsers);
router.get('/admin/reviews', interactionController.getAdminReviews);
router.get('/admin/analytics', interactionController.getAdminAnalytics);

export default router;
