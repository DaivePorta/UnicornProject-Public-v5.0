Public Class CORegistroCotizacion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Crear_sol_cotizacion(ByVal p_CTLG_CODE As String,
                                         ByVal p_SCSL_CODE As String,
                                         ByVal p_DETALLE As String,
                                         ByVal p_DESCRIPCION As String,
                                         ByVal p_FECHA_TRAN As String,
                                         ByVal p_USUA_ID As String,
                                         ByVal p_TIPO_PROV As String,
                                         ByVal p_TIPO_COTI As String,
                                         ByVal p_CONDICIONES As String,
                                         ByVal p_TIPO_COTI_BS As String,
                                         Optional ByVal p_COD_REQ As String = "",
                                         Optional ByVal p_PROV_CORREOS As String = "",
                                         Optional ByVal p_CORREOS As String = "",
                                         Optional ByVal p_MONEDA As String = "",
                                         Optional ByVal p_IND_COMPLETADO As String = "S") As String

        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_SOLICITUD_COTIZACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRAN", p_FECHA_TRAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PROV", p_TIPO_PROV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_COTI", p_TIPO_COTI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONDICIONES", p_CONDICIONES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_COTI_BS", p_TIPO_COTI_BS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_REQ", p_COD_REQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CORREOS", p_PROV_CORREOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORREOS", p_CORREOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETADO", p_IND_COMPLETADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_SOL", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@p_NRO_SOL").Value

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_sol_cotizacion(ByVal p_CTLG_CODE As String,
                                              ByVal p_SCSL_CODE As String,
                                              ByVal p_DETALLE As String,
                                              ByVal p_DESCRIPCION As String,
                                              ByVal p_FECHA_TRAN As String,
                                              ByVal p_USUA_ID As String,
                                              ByVal p_TIPO_PROV As String,
                                              ByVal p_CODIGO As String,
                                              ByVal p_CONDICIONES As String,
                                              Optional ByVal p_MONEDA As String = "") As String

        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_SOLICITUD_COTIZACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRAN", p_FECHA_TRAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PROV", p_TIPO_PROV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONDICIONES", p_CONDICIONES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@p_RESP").Value

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Completar_sol_cotizacion(ByVal p_CODIGO As String, ByVal p_CODIGO_GRUP_PROV As String, ByVal p_USUA_ID As String) As Array

        Try

            Dim msg(3) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_COMPLETAR_SOLICITUD_COTIZACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_GRUP_CODE", p_CODIGO_GRUP_PROV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORREOS", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORREO_REMITENTE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NREMITENTE", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)


            msg(0) = cmd.Parameters("@p_RESP").Value()
            msg(1) = cmd.Parameters("@p_CORREOS").Value()
            msg(2) = cmd.Parameters("@p_CORREO_REMITENTE").Value()
            msg(3) = cmd.Parameters("@p_NREMITENTE").Value()
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    
    Public Function Listar_Solicitud_Cotizacion(ByVal p_CODIGO As String, ByVal p_ESTADO As String, ByVal p_TIPO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_TIPO_PROV As String, ByVal p_ESTADO_COMPL As String, ByVal p_TIPO_COTI As String, ByVal P_TIPO_BS As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_SOLICITUD_COTIZACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PROV", p_TIPO_PROV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_COMPL", p_ESTADO_COMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_COTI", p_TIPO_COTI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_BS", P_TIPO_BS, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    





    


    

    


    
End Class
