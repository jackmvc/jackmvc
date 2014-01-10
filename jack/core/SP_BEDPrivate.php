<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
|--------------------------------------------------------------------------
| Admin Controller
|--------------------------------------------------------------------------
|
| Bu, Admin boyunca kullanýlan Yönetici sýnýf için temel oluþturur.
| Burada Kod, yönetici kontrolden önce çalýþtýrýlýr.
|
| @author      Mert KABADAYI
| @copyright   Copyright (c) 2014, Smartpixel Interactive
| @package     App\Core
|
*/

class SP_Backend extends MY_Controller {

	/**
	 * Yönetici denetleyicileri rastgele bir dize normalde, bölümler olabilir
	 *
	 * @var string 
	 */
	protected $section = null;

	/**
	 * Yüklü dil, flashdata tanýmlamalarý, https, yük kontrol ve yönetici tema için veri kurulum
	 */
	public function __construct(){
	   
		parent::__construct();

        // Admin panel için gerekli bileþenleri yüklüyoruz.
		$this->load->library('form_validation');
		$this->lang->load(array('admin', 'buttons', 'users/user'));
		$this->load->helper('admin_theme');
		
		// Kullanýcý yeterli izinlere sahip deðilse hata ve çýkýþ göster
		if ( ! self::_check_access()){
			$this->session->set_flashdata('error', lang('cp:access_denied'));	
			redirect();
		}

		// Ayar etkinleþtirilirse HTTPS isteðine yönlendirme
		if ($this->settings->admin_force_https and strtolower(substr(current_url(), 4, 1)) != 's')
			redirect(str_replace('http:', 'https:', current_url()).'?session='.session_id());


        self::_theme();
		self::_template();
        Events::trigger('admin_controller');
	}
    
    private function _theme()
    {
        // Admin için tanýmlý tema bilgilerini ve özelliklerini alýyoruz.
        ci()->theme          = $this->theme_m->get_admin();
        ci()->theme->options = $this->pyrocache->model('theme_m', 'get_values_by', array(array('theme' => $this->theme->slug)));
		
		// Admin panel için bir tema seçilmemiþ ise hata göster
		if (empty($this->theme->slug)) 
            show_error('This site has been set to use an admin theme that does not exist.');

		// Seçili admin temanýn run methodunu çalýþtýrýyoruz.
		$class = 'Theme_'.ucfirst($this->theme->slug);
		call_user_func(array(new $class, 'run'));

		// Asset için route belirtiyoruz
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