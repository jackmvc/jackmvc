<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
|--------------------------------------------------------------------------
| Admin Controller
|--------------------------------------------------------------------------
|
| Bu, Admin boyunca kullan�lan Y�netici s�n�f i�in temel olu�turur.
| Burada Kod, y�netici kontrolden �nce �al��t�r�l�r.
|
| @author      Mert KABADAYI
| @copyright   Copyright (c) 2014, Smartpixel Interactive
| @package     App\Core
|
*/

class SP_Backend extends MY_Controller {

	/**
	 * Y�netici denetleyicileri rastgele bir dize normalde, b�l�mler olabilir
	 *
	 * @var string 
	 */
	protected $section = null;

	/**
	 * Y�kl� dil, flashdata tan�mlamalar�, https, y�k kontrol ve y�netici tema i�in veri kurulum
	 */
	public function __construct(){
	   
		parent::__construct();

        // Admin panel i�in gerekli bile�enleri y�kl�yoruz.
		$this->load->library('form_validation');
		$this->lang->load(array('admin', 'buttons', 'users/user'));
		$this->load->helper('admin_theme');
		
		// Kullan�c� yeterli izinlere sahip de�ilse hata ve ��k�� g�ster
		if ( ! self::_check_access()){
			$this->session->set_flashdata('error', lang('cp:access_denied'));	
			redirect();
		}

		// Ayar etkinle�tirilirse HTTPS iste�ine y�nlendirme
		if ($this->settings->admin_force_https and strtolower(substr(current_url(), 4, 1)) != 's')
			redirect(str_replace('http:', 'https:', current_url()).'?session='.session_id());


        self::_theme();
		self::_template();
        Events::trigger('admin_controller');
	}
    
    private function _theme()
    {
        // Admin i�in tan�ml� tema bilgilerini ve �zelliklerini al�yoruz.
        ci()->theme          = $this->theme_m->get_admin();
        ci()->theme->options = $this->pyrocache->model('theme_m', 'get_values_by', array(array('theme' => $this->theme->slug)));
		
		// Admin panel i�in bir tema se�ilmemi� ise hata g�ster
		if (empty($this->theme->slug)) 
            show_error('This site has been set to use an admin theme that does not exist.');

		// Se�ili admin teman�n run methodunu �al��t�r�yoruz.
		$class = 'Theme_'.ucfirst($this->theme->slug);
		call_user_func(array(new $class, 'run'));

		// Asset i�in route belirtiyoruz
		Asset::add_path('theme', $this->theme->asset_path);
		Asset::add_path('Admin', $this->theme->asset_path);
		Asset::set_path('theme');  
    }
    
    private function _template()
    {
        
		// Active Admin Section (might be null, but who cares)
		$this->template->active_section = $this->section;
		// ------------------------------
		
        // Template configuration
		$this->template
			->enable_parser(false)
			->set('theme_options', $this->theme->options)
			->set_theme($this->theme->slug);
		
			is_logged_in()  
					? $this->template->set_layout('private', 'admin')
					: $this->template->set_layout('public', 'admin');
		
		if ( $this->input->is_ajax_request() ){
			$this->output->set_header('Content-Type: application/json; charset=utf-8');
			$this->template->set_layout('ajax');
		}	  
    }


	/**
	 * Checks to see if a user object has access rights to the admin area.
	 *
	 * @return boolean 
	 */
	private function _check_access(){
	   
		// These pages get past permission checks
		$ignored_pages = array('admin/login', 'admin/logout', 'admin/help');

		// Check if the current page is to be ignored
		$current_page = $this->uri->segment(1, '') . '/' . $this->uri->segment(2, 'index');

		// Dont need to log in, this is an open page
		if (in_array($current_page, $ignored_pages))
			return true;

		if ( ! $this->current_user)
		{
			// save the location they were trying to get to
			$this->session->set_userdata('admin_redirect', $this->uri->uri_string());
			redirect('admin/login');
		}

		// Admins can go straight in
		if ($this->current_user->group === 'admin')
			return true;

		// Well they at least better have permissions!
		if ($this->current_user)
		{
			// We are looking at the index page. Show it if they have ANY admin access at all
			if ($current_page == 'admin/index' && $this->permissions)
				return true;

			// Check if the current user can view that page
			return array_key_exists($this->module, $this->permissions);
		}

		// god knows what this is... erm...
		return false;
	}

}